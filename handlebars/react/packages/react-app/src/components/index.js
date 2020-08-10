import styled from 'styled-components'

export const Body = styled.body`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`
export const Image = styled.img`
  height: 40vmin;
  margin-bottom: 16px;
  pointer-events: none;
`

export const Link = styled.a.attrs({
  target:"_blank",
  rel:"noopener noreferrer"
})`
  color: #61dafb;
  margin-top: 10px;
`

export const Button = styled.button`
  background-color: white;
  border: none;
  border-radius: 8px;
  color: #282c34;
  cursor: pointer;
  padding: 12px 24px;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 0px 20px;

  ${(props) => props.hidden && "hidden"}
  
  :focus {
    border: none;
    outline: none;
  }
`
