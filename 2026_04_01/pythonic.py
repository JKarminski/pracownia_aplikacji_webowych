from dataclasses import dataclass, field
from typing import List, Dict
import unicodedata
import os

def normalize_str(s: str) -> str:
    nkfd = unicodedata.normalize('NFKD', s)
    ascii_only = ''.join(ch for ch in nkfd if not unicodedata.combining(ch))
    return ascii_only.strip()

@dataclass
class Course:
    name: str

@dataclass
class Student:
    id: int
    first_name: str
    last_name: str
    age: int
    courses: List[Course] = field(default_factory=list)

def read_students(path: str) -> Dict[int, Student]:
    students: Dict[int, Student] = {}
    with open(path, encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            parts = line.split(',')
            if len(parts) < 4:
                continue
            sid = int(parts[0])
            first = normalize_str(parts[1])
            last = normalize_str(parts[2])
            age = int(parts[3])
            students[sid] = Student(id=sid, first_name=first, last_name=last, age=age)
    return students

def read_courses(path: str) -> Dict[int, List[Course]]:
    courses_by_student: Dict[int, List[Course]] = {}
    with open(path, encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            parts = line.split(',', 1)
            if len(parts) < 2:
                continue
            sid = int(parts[0])
            course_name = normalize_str(parts[1])
            courses_by_student.setdefault(sid, []).append(Course(name=course_name))
    return courses_by_student

def normalize_filename(s: str) -> str:
    s2 = normalize_str(s)
    s2 = s2.replace(' ', '_')
    return s2.lower()

def main(students_file: str = 'students.txt', courses_file: str = 'courses.txt', out_dir: str = '.'):
    students = read_students(students_file)
    courses_map = read_courses(courses_file)
    for sid, course_list in courses_map.items():
        if sid in students:
            students[sid].courses.extend(course_list)
    for sid in sorted(students.keys()):
        s = students[sid]
        course_names = ', '.join(c.name for c in s.courses) if s.courses else 'Brak kursow'
        print(f"{s.first_name} {s.last_name} ({s.age} lat): {course_names}")
    os.makedirs(out_dir, exist_ok=True)
    for s in students.values():
        filename = f"{normalize_filename(s.first_name)}_{normalize_filename(s.last_name)}.txt"
        path = os.path.join(out_dir, filename)
        with open(path, 'w', encoding='utf-8') as f:
            f.write("Kursy:\n")
            if s.courses:
                for i, c in enumerate(s.courses):
                    sep = ',' if i < len(s.courses) - 1 else ''
                    f.write(f"- {c.name}{sep}\n")
            else:
                f.write("- Brak kursow\n")

if __name__ == '__main__':
    main()
