export function errorFunction(data) {
  if (data.length === 0) {
    wrapper.innerHTML =
                        `<div id='not-found'>
                          <img src='./images/not-found.png'>
                          <p>data not found</p>
                        </div>`
  }
}