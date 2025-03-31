const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" },
];

function createPromise(link) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = link;
        img.onload = () => resolve({ url: link, img });
        img.onerror = () => reject(`Failed to load image: ${link}`);
    });
}

btn.addEventListener("click", () => {
    output.innerHTML = `<div id="loading">Loading images...</div>`; // Show loading

    const promises = images.map(img => createPromise(img.url));

    Promise.all(promises)
        .then(results => {
            output.innerHTML = ""; // Clear loading
            results.forEach(result => output.appendChild(result.img));
        })
        .catch(error => {
            output.innerHTML = `<div id="error">${error}</div>`;
        });
});
