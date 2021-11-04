function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

// Get the best item bounds to fit in the container. Param object must have
// width, height, itemCount, aspectRatio, maxRows, and minGap. The itemCount
// must be greater than 0. Result is single object with rowCount, colCount,
// itemWidth, and itemHeight.
function getBestItemBounds(config) {
  const actualRatio = config.width / config.height
  // Just make up theoretical sizes, we just care about ratio
  const theoreticalHeight = 100
  const theoreticalWidth = theoreticalHeight * config.aspectRatio
  // Go over each row count find the row and col count with the closest
  // ratio.
  let best
  for (let rowCount = 1; rowCount <= config.maxRows; rowCount++) {
    // Row count can't be higher than item count
    if (rowCount > config.itemCount) continue
    const colCount = Math.ceil(config.itemCount / rowCount)
    // Get the width/height ratio
    const ratio = (theoreticalWidth * colCount) / (theoreticalHeight * rowCount)
    if (!best || Math.abs(ratio - actualRatio) < Math.abs(best.ratio - actualRatio)) {
      best = { rowCount, colCount, ratio }
    }
  }
  // Build item height and width. If the best ratio is less than the actual ratio,
  // it's the height that determines the width, otherwise vice versa.
  const result = { rowCount: best.rowCount, colCount: best.colCount }
  if (best.ratio < actualRatio) {
    result.itemHeight = (config.height - (config.minGap * best.rowCount)) / best.rowCount
    result.itemWidth = result.itemHeight * config.aspectRatio
  } else {
    result.itemWidth = (config.width - (config.minGap * best.colCount)) / best.colCount
    result.itemHeight = result.itemWidth / config.aspectRatio
  }
  return result
}

function resizeGridItems() {
  var itemCount = document.querySelectorAll(".project-grid-item").length;

  if (!itemCount) return;

  const container = document.getElementById("projects-page");
  const rect = container.getBoundingClientRect();

  // Get best item bounds and apply property
  const { itemWidth, itemHeight } = getBestItemBounds({
    width: rect.width,
    height: rect.height,
    itemCount,
    aspectRatio: 1 / 1,
    maxRows: 5,
    minGap: 50
  });
  //console.log('Item changes', itemWidth, itemHeight)
  container.style.setProperty("--item-width", itemWidth + "px");
  container.style.setProperty("--item-height", itemHeight + "px");
}

setTimeout(() => {
  resizeGridItems();
}, 1000);

export { resizeGridItems };