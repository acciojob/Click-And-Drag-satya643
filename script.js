// Your code here.
const container = document.getElementById('container');
const cubes = document.querySelectorAll('.cube');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Set initial positions in the grid
cubes.forEach((cube, index) => {
  const row = Math.floor(index / 4);
  const col = index % 4;
  cube.style.left = `${col * 110}px`;
  cube.style.top = `${row * 110}px`;
});

// Mouse down - start dragging
cubes.forEach(cube => {
  cube.addEventListener('mousedown', e => {
    selectedCube = cube;
    selectedCube.classList.add('dragging');

    const rect = selectedCube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });
});

// Mouse move - drag cube
document.addEventListener('mousemove', e => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = selectedCube.getBoundingClientRect();

  let left = e.clientX - containerRect.left - offsetX;
  let top = e.clientY - containerRect.top - offsetY;

  // Boundary constraints
  left = Math.max(0, Math.min(left, container.clientWidth - cubeRect.width));
  top = Math.max(0, Math.min(top, container.clientHeight - cubeRect.height));

  selectedCube.style.left = `${left}px`;
  selectedCube.style.top = `${top}px`;
});

// Mouse up - drop cube
document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.classList.remove('dragging');
    selectedCube = null;
  }
});
