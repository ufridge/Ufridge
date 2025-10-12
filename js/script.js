function toggleFridge(img) {
  const currentFile = img.src.split("/").pop();
  if (currentFile === img.dataset.closed) {
    img.src = "images/" + img.dataset.open;
  } else {
    img.src = "images/" + img.dataset.closed;
  }
}