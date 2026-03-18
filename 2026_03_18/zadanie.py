result = []

with open ('sygnaly.txt', 'r', encoding='utf-8')  as f:
    for i, line in enumerate(f, start=1):
        if i % 40 == 0:
            word = line.strip()
            if len(word) >= 10:         #niby jest ze nie trzeba ale lepiej zrobic
                result.append(word[9])

print(result)
for i in range(0, len(result)):
    print(result[i], end="")
