from models.Teacher import Teacher

class Subject:
    def __init__(self, _id, name, teacher):
        self._id = _id
        self.name = name
        self.teacher = teacher

    def __str__(self):
        return f"{self.name} {self.teacher}"

if __name__ == "__main__":
    t = Teacher(1, "Anna", "Nowak")
    s = Subject(1, "Matematyka", t)
    print(s)        #Matematyka Anna Nowak
