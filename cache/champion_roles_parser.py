
from typing import Dict, List


def parse(filename: str) -> Dict[str, List[str]]:
    file = open(filename, "r")
    result = {}
    for line in file:
        split = line.split(":")
        name = split[0]
        roles = split[1].split(",")
        result[name] = roles
    return result

if __name__ == "__main__":
    parse("champion-roles.txt")
