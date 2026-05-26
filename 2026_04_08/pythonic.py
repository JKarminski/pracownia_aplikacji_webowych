from typing import List, Tuple

def read_graph(filename: str) -> Tuple[List[List[int]], int]:
    with open(filename, "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f if line.strip() and not line.strip().startswith("#")]
    if not lines:
        raise ValueError("Plik jest pusty lub nie zawiera danych.")
    try:
        n = int(lines[0])
    except ValueError as e:
        raise ValueError("Pierwsza linia musi zawierac liczbe wierzcholkow.") from e
    neighbours: List[List[int]] = [[] for _ in range(n)]
    for i in range(1, min(len(lines), n + 1)):
        idx = i - 1
        parts = lines[i].split()
        if not parts:
            neighbours[idx] = []
            continue
        try:
            nums = [int(x) for x in parts]
        except ValueError:
            raise ValueError(f"Niepoprawne liczby w wierszu {i+1}: {lines[i]}")
        if nums and nums[0] == idx:
            neighbours[idx] = nums[1:]
        else:
            neighbours[idx] = nums
    return neighbours, n

def write_neighbours_list(neighbours: List[List[int]]) -> None:
    for i, neigh in enumerate(neighbours):
        if neigh:
            unique_sorted = sorted(dict.fromkeys(neigh))
            neigh_str = ", ".join(str(x) for x in unique_sorted)
        else:
            neigh_str = "brak"
        print(f"Sasiadami wierzcholka {i} sa: {neigh_str}")

def list_to_matrix(neighbours: List[List[int]], n: int) -> List[List[int]]:
    matrix: List[List[int]] = [[0 for _ in range(n)] for _ in range(n)]
    for i, neigh in enumerate(neighbours):
        for j in neigh:
            if 0 <= j < n:
                matrix[i][j] = 1
            else:
                print(f"Uwaga: zignorowano sasiada {j} wierzcholka {i} (poza zakresem 0..{n-1})")
    return matrix

def write_matrix(matrix: List[List[int]]) -> None:
    print("Macierz sasiedztwa:")
    for row in matrix:
        print(" ".join(str(x) for x in row))

def main() -> None:
    filename = "graph.txt"
    try:
        neighbours, n = read_graph(filename)
    except Exception as e:
        print(f"Blad podczas odczytu grafu: {e}")
        return
    print(f"Wczytano graf o liczbie wierzcholkow: {n}\n")
    write_neighbours_list(neighbours)
    print()
    matrix = list_to_matrix(neighbours, n)
    write_matrix(matrix)

if __name__ == "__main__":
    main()
