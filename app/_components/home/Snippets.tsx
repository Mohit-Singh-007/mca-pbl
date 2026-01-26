"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  SortAsc,
  Database,
  Shuffle,
  Layers,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DSA_CONCEPTS = [
  {
    title: "Trie Data Structure",
    description: "Efficient prefix-based search for product titles",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
    code: `class TrieNode {
  Map<Character, TrieNode> children;
  Set<Integer> productIds;
}

public Set<Integer> search(String query) {
  TrieNode node = root;
  for (char c : query.toLowerCase()) {
    if (!node.children.containsKey(c))
      return new HashSet<>();
    node = node.children.get(c);
  }
  return node.productIds;
}`,
  },
  {
    title: "Binary Search Tree",
    description: "Fast range queries for price and rating filters",
    icon: Filter,
    color: "from-purple-500 to-pink-500",
    code: `class PriceBST {
  TreeNode root;

  public Set<Integer> rangeQuery(
    double min, double max
  ) {
    Set<Integer> result = new HashSet<>();
    rangeQueryHelper(root, min, max, result);
    return result;
  }
}`,
  },
  {
    title: "HashMap Indexing",
    description: "O(1) category filtering with inverted index",
    icon: Database,
    color: "from-orange-500 to-red-500",
    code: `class CategoryIndex {
  Map<String, Set<Integer>> categoryMap;

  public void addProduct(Product product) {
    categoryMap
      .computeIfAbsent(product.getCategory(),
        k -> new HashSet<>())
      .add(product.getId());
  }
}`,
  },
  {
    title: "Efficient Sorting",
    description: "In-memory sorting with custom comparators",
    icon: SortAsc,
    color: "from-green-500 to-emerald-500",
    code: `private void sortProducts(
  List<Product> products,
  String sortBy, String order
) {
  products.sort((p1, p2) -> {
    int comparison = Double.compare(
      p1.getPrice(), p2.getPrice()
    );
    return "desc".equals(order)
      ? -comparison : comparison;
  });
}`,
  },
  {
    title: "Two-Pointer Optimization",
    description: "Efficient filtering of sorted product lists",
    icon: Shuffle,
    color: "from-rose-500 to-pink-500",
    code: `public List<Product> filterByRange(
  List<Product> products,
  double min, double max
) {
  int left = 0, right = products.size() - 1;
  List<Product> result = new ArrayList<>();

  while (left <= right) {
    if (products.get(left).getPrice() >= min)
      result.add(products.get(left));
    left++;
  }
  return result;
}`,
  },
  {
    title: "Heap / Priority Queue",
    description: "Efficient retrieval of top-rated or cheapest products",
    icon: Layers,
    color: "from-indigo-500 to-purple-500",
    code: `class ProductHeap {
  PriorityQueue<Product> pq;

  ProductHeap() {
    pq = new PriorityQueue<>(
      Comparator.comparingDouble(
        Product::getRating
      ).reversed()
    );
  }

  public Product getTopRated() {
    return pq.peek();
  }
}`,
  },
];

export default function CodeCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {DSA_CONCEPTS.map((concept, index) => (
        <ConceptCard key={index} concept={concept} />
      ))}
    </div>
  );
}

function ConceptCard({ concept }: { concept: (typeof DSA_CONCEPTS)[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = concept.icon;

  return (
    <Card
      className="relative overflow-hidden transition-all duration-500 hover:shadow-2xl cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 bg-linear-to-br ${concept.color} opacity-0 group-hover:opacity-10 transition-opacity`}
      />

      <CardHeader>
        <div className="flex items-start justify-between">
          <div
            className={`p-3 rounded-lg bg-linear-to-br ${concept.color} text-white`}
          >
            <Icon className="h-6 w-6" />
          </div>

          <Badge variant="outline" className="text-xs">
            O(log n)
          </Badge>
        </div>

        <CardTitle className="mt-4">{concept.title}</CardTitle>
        <CardDescription>{concept.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div
          className={`transition-all duration-700 ${
            isHovered ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{concept.code}</code>
          </pre>
        </div>

        {!isHovered && (
          <p className="text-sm text-muted-foreground">
            Hover to see implementation →
          </p>
        )}
      </CardContent>
    </Card>
  );
}
