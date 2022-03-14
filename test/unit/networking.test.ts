import child_process from "child_process";
import dns from "dns";
import url from "url";

import { getOnline, getProxy } from "../../src/helpers/networking";

describe("networking", function () {
  let dnsLookupMock: any;
  let execSyncMock: any;
  let urlParseMock: any;

  beforeAll(function () {
    dnsLookupMock = jest.spyOn(dns, "lookup");
    execSyncMock = jest.spyOn(child_process, "execSync");
    urlParseMock = jest.spyOn(url, "parse");
  });

  describe("getProxy", function () {
    describe("when process.env.https_proxy is set", function () {
      beforeEach(function () {
        process.env.https_proxy = "https://127.0.0.1";
      });

      test("it returns process.env.https_proxy", function () {
        expect(getProxy()).toBe("https://127.0.0.1");
      });

      afterEach(function () {
        delete process.env["https_proxy"];
      });
    });

    describe("when the npm config proxy is null", function () {
      beforeEach(function () {
        execSyncMock.mockReturnValueOnce("null");
      });

      test("it returns an empty string", function () {
        expect(getProxy()).toBe("");
      });
    });

    describe("when the npm config proxy throws an error", function () {
      beforeEach(function () {
        execSyncMock.mockImplementationOnce(function () {
          throw new Error();
        });
      });

      test("it returns an empty string", function () {
        expect(getProxy()).toBe("");
      });
    });

    describe("when the npm config proxy is set", function () {
      beforeEach(function () {
        execSyncMock.mockReturnValueOnce("https://127.0.0.1");
      });

      test("it returns the npm config proxy", function () {
        expect(getProxy()).toBe("https://127.0.0.1");
      });
    });
  });

  describe("getOnline", function () {
    describe("when the dns lookup returns no registry error", function () {
      beforeEach(function () {
        dnsLookupMock.mockImplementationOnce(function (_hostname: string, callback: any) {
          callback(null);
        });
      });

      test("it returns true", async function () {
        const result = await getOnline();
        expect(result).toBe(true);
      });
    });

    describe("when the dns lookup returns a registry error", function () {
      beforeEach(function () {
        dnsLookupMock.mockImplementationOnce(function (_hostname: string, callback: any) {
          callback(new Error("Registry error"));
        });
      });

      describe("when the proxy is not set", function () {
        test("it returns false", async function () {
          const result = await getOnline();
          expect(result).toBe(false);
        });
      });

      describe("when the proxy is set", function () {
        beforeEach(function () {
          execSyncMock.mockReturnValueOnce("https://127.0.0.1");
        });

        describe("when the hostname is not valid", function () {
          beforeEach(function () {
            urlParseMock.mockReturnValueOnce({ hostname: undefined });
          });

          test("it returns false", async function () {
            const result = await getOnline();
            expect(result).toBe(false);
          });
        });

        describe("when the hostname is valid", function () {
          beforeEach(function () {
            urlParseMock.mockReturnValueOnce({ hostname: "127.0.0.1" });
          });

          describe("when the dns lookup returns a registry error", function () {
            beforeEach(function () {
              dnsLookupMock.mockImplementationOnce(function (_hostname: string, callback: any) {
                callback(new Error("Registry error"));
              });
            });

            test("it returns false", async function () {
              const result = await getOnline();
              expect(result).toBe(false);
            });
          });

          describe("when the dns lookup returns no registry error", function () {
            beforeEach(function () {
              dnsLookupMock.mockImplementationOnce(function (_hostname: string, callback: any) {
                callback(null);
              });
            });

            test("it returns true", async function () {
              const result = await getOnline();
              expect(result).toBe(true);
            });
          });
        });
      });
    });
  });

  afterAll(function () {
    dnsLookupMock.mockRestore();
    execSyncMock.mockRestore();
    urlParseMock.mockRestore();
  });
});
