max_slowo = ""
max_roznych = 0

with open("sygnaly.txt") as f:
    for slowo in f:
        slowo = slowo.strip()
        rozne = len(set(slowo))

        if rozne > max_roznych:
            max_roznych = rozne
            max_slowo = slowo

print(max_slowo, max_roznych)
