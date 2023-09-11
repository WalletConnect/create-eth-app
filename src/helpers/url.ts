import https from "https";

export const urlExists = (url: string): Promise<boolean> =>
  new Promise(resolve => {
    https.get(
      url,
      {
        headers: {
          "User-Agent": "create-eth-app",
        },
      },
      res => resolve(res.statusCode === 200),
    );
  });
