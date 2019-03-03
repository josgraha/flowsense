const { DirectedGraph, UndirectedGraph } = require('../graph');

const buildOffsetGraph = (graph, nodes) => {
  const hasNext = index => index + 1 < nodes.length;
  let i = 0;
  let v = nodes[i];
  let next = null;
  graph.addVertex(v);
  while (hasNext(i)) {
    const nextIndex = i + 1;
    next = nodes[nextIndex];
    graph.addVertex(next);
    graph.addEdge(v, next);
    i = nextIndex;
    v = next;
  }
  const first = nodes[0];
  graph.addEdge(first, v);
  return graph;
};

describe('Directed Graph', () => {
  let graph;

  beforeAll(() => {
    graph = new UndirectedGraph();
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addEdge('A', 'B', 1);
    graph.addEdge('B', 'C', 2);
    graph.addEdge('C', 'A', 3);
  });

  it('Should have 3 vertices', () => {
    expect(graph.vertices().length).toEqual(3);
  });

  describe('Graph traversals', () => {
    let graph1;

    beforeAll(() => {
      graph1 = buildOffsetGraph(new DirectedGraph(), '12345'.split(''));
    });

    it('BFS traversal should have order', () => {
      const nodes = [];
      graph1.visitBfs(node => {
        nodes.push(node);
      });
      const result = nodes.join('');
      expect(result).toEqual('12534');
    });

    it('DFS traversal should have order', () => {
      const nodes = [];
      graph1.visitDfs(node => {
        nodes.push(node);
      });
      const result = nodes.join('');
      expect(result).toEqual('12345');
    });
  });
});
