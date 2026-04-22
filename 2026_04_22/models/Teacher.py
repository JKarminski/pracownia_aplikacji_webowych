class Teacher:
    def __init__(self, _id, name, surname):
        self._id = _id
        self.name = name
        self.surname = surname

    def __str__(self):
        return f"{self.name} {self.surname}"

if __name__ == "__main__":
    t = Teacher(1, "Anna", "Nowak")
    print(t)        # Anna Nowak
