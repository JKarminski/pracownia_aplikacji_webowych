from datetime import date

class Student:
    def __init__(self, _id, first_name, last_name, birth_date):
        self._id = _id
        self.first_name = first_name
        self.last_name = last_name
        self.birth_date = birth_date

    @property
    def age(self):
        return date.today().year - self.birth_date.year

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.age})"

if __name__ == "__main__":
    p = Student(1, "Jan", "Kowalski", date(1990, 5, 20))
    print(p)      # Jan Kowalski (36) jeśli aktualny rok to 2026
    print(p.age)  # 36
