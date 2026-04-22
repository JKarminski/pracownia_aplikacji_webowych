from datetime import date
from models.Student import Student
from models.Subject import Subject
from models.Teacher import Teacher

class Grades:
    def __init__(self, student, subject):
        self.grades = []
        self.student = student
        self.subject = subject

    def add_grade(self, grade: int) -> None:

        #Dodaje ocene do listy grades

        if grade < 1 or grade > 6:
            raise ValueError("Grade must be between 1 and 6")
        self.grades.append(grade)

    def get_grades(self) -> list[int]:
        #Zwraca liste ocen
        return self.grades

    def get_average(self) -> float:
        #Zwraca srednia ocen. Jesli brak ocen, zwraca 0.0
        if not self.grades:
            return 0.0
        return sum(self.grades) / len(self.grades)

    def __str__(self):
        return f"Grades for {self.student} in {self.subject}: {self.grades}"

if __name__ == "__main__":
    t = Teacher(1, "Anna", "Nowak")
    s = Subject(1, "Matematyka", t)
    st = Student(1, "Jan", "Kowalski", date(1990, 5, 20))
    g = Grades(st, s)
    g.add_grade(5)
    g.add_grade(4)
    print(g)            # Grades for Jan Kowalski in Matematyka Anna Nowak: [5]
    print(g.student)    # Jan Kowalski (36)
    print(g.subject)    # Matematyka Anna Nowak
