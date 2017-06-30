
from typing import Dict, List


def parse(filename: str) -> Dict[str, List[str]]:
    file = open(filename, "r")
    result = {}
    file_iter = iter(file)
    next(file_iter)
    next(file_iter)
    for line in file:
        split = list(map(lambda x: x.strip(), line.split(":")))
        name = split[0]
        roles = list(map(lambda x: x.strip(), split[1].split(",")))
        result[name] = roles
    return result

if __name__ == "__main__":
    d = parse("champion-roles.txt")
    for name, roles in d.items():
        print(name, roles)
