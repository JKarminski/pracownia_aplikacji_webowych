def year_grade(average: float) -> int:
    #Zamienia srednia na ocenki
    if average >= 5.5:
        return 6
    if average >= 4.7:
        return 5
    if average >= 3.7:
        return 4
    if average >= 2.7:
        return 3
    if average >= 1.85:
        return 2
    return 1


if __name__ == "__main__":
    # Przyklady uzycia
    tests = [5.8, 5.5, 5.49, 4.7, 4.69, 3.7, 2.7, 1.85, 1.84, 0.0]
    for t in tests:
        print(f"average={t} -> year_grade={year_grade(t)}")