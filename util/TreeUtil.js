const eachTree = (tree, childName, handler) => {
  if (tree instanceof Array) {
    const result = []
    for (const item of tree) {
      const children = item[childName]
      const han = handler(item)
      if (children instanceof Array) {
        han[childName] = eachTree(children, childName, handler)
      }
      result.push(han)
    }
    return result
  }
}
const flatTree = (tree, childName, handler) => {
  let result = []
  if (tree instanceof Array) {
    for (const item of tree) {
      const children = item[childName]
      const han = handler(item)
      if (children instanceof Array) {
        const temp = flatTree(children, childName, handler)
        result = result.concat(temp)
      }
      result.push(han)
    }
  }
  return result
}
export const TreeUtil = {
  eachTree: eachTree,
  flatTree: flatTree
}
