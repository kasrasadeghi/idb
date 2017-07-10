import os
from subprocess import call


def run(command: str) -> None:
    print("$", command)
    call(command.split())


def main():
    call("rm -rf output".split())
    react_scripts = [name for name in os.listdir(".") if os.path.isdir(os.path.join(".", name))]
    react_scripts.remove("search")
    react_scripts.remove("search2")
    call("mkdir output".split())

    print(react_scripts)

    for project in react_scripts:
        os.chdir(project)
        call("npm run build".split())
        os.chdir("..")

    for project in react_scripts:
        os.chdir(os.path.join(project, "build", "static", "js"))
        javascript_file_path = [name for name in os.listdir(".") if name[-3:] == ".js"][0]
        os.chdir("../../../..")
        command = "cp %s/build/static/js/%s output/%s" \
                  % (project, javascript_file_path, javascript_file_path.replace("main", project))
        run(command)

    for project in react_scripts:
        os.chdir(os.path.join(project, "build", "static", "css"))
        css_file_path = [name for name in os.listdir(".") if name.endswith(".css")][0]
        os.chdir("../../../..")
        command = "cp %s/build/static/css/%s output/%s" \
                  % (project, css_file_path, css_file_path.replace("main", project))
        run(command)

    run("tree output")

    run("rm -rf ../leaguedb/app/react/")
    run("mkdir ../leaguedb/app/react/")

    for file in os.listdir("output"):
        run("cp output/" + file + " ../leaguedb/app/react/" + file)


if __name__ == "__main__":
    main()
