class DirectedGraph {
  rootNode = null;
  edges = {};

  addVertex(vertex) {
    if (this.rootNode === null) {
      this.rootNode = vertex;
    }
    this.edges[vertex] = {};
  }

  addEdge(origVertex, destVertex, weight = 0) {
    this.edges[origVertex][destVertex] = 0;
  }

  vertices() {
    return Object.keys(this.edges);
  }

  neighbors(vertex) {
    return Object.keys(this.edges[vertex] || {});
  }

  removeEdge(fromVertex, toVertex) {
    const { edges } = this;
    return edges[vertex] && edges[vertex][toVertex] && delete edges[vertex][toVertex];
  }

  removeVertex(vertex) {
    Object.keys(this.eges[vertex] || {}).map(adjacent => ({
      from: adjacent,
      to: vertex,
      removed: this.removeEdge(adjacent, vertex),
    }));
  }

  toString() {
    return JSON.stringify(this.edges);
  }

  visitBfs(fn, node) {
    let vertex = node !== undefined ? node : this.rootNode;
    const visited = {};
    const queue = [];
    queue.push(vertex);
    while (queue.length) {
      vertex = queue.shift();
      if (!visited[vertex]) {
        visited[vertex] = true;
        fn(vertex);
        Object.keys(this.edges[vertex] || {}).forEach(v => {
          queue.push(v);
        });
      }
    }
  }

  visitDfs(fn, node) {
    const loop = (vertex, visited = {}) => {
      visited[vertex] = true;
      fn(vertex);
      Object.keys(this.edges[vertex] || {}).forEach(v => {
        if (!visited[v]) {
          loop(v, visited);
        }
      });
    };
    loop(node !== undefined ? node : this.rootNode);
  }
}

class UndirectedGraph extends DirectedGraph {
  addEdge(origVertex, destVertex, weight = 0) {
    super.addEdge(origVertex, destVertex, weight);
    super.addEdge(destVertex, origVertex, weight);
  }
}

module.exports = {
  DirectedGraph,
  UndirectedGraph,
};
