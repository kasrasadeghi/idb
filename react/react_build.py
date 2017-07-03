import os
from subprocess import call


def run(command: str) -> None:
    call(command.split())


def main():
    call("rm -rf output".split())
    react_scripts = [name for name in os.listdir(".") if os.path.isdir(os.path.join(".", name))]
    call("mkdir output".split())

    print(react_scripts)

    # for project in react_scripts:
    #     os.chdir(project)
    #     call("npm run build".split())
    #     os.chdir("..")

    for project in react_scripts:
        os.chdir(os.path.join(project, "build", "static", "js"))
        javascript_file_path = [name for name in os.listdir(".") if name[-3:] == ".js"][0]
        os.chdir("../../../..")
        command = "cp %s/build/static/js/%s output/%s" \
                  % (project, javascript_file_path, javascript_file_path.replace("main", project))
        run(command)

    run("tree output")

if __name__ == "__main__":
    main()
