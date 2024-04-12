import os
from pathlib import Path
import shutil


def generate_page(base_template_path, child_template_path, page_path):
    """
    Generate a new HTML page based on a child template.

    Parameters
    ----------
    base_template_path : str
        The path to the base HTML template file.
    child_template_path : str
        The path to the child HTML file serving as the template.
    page_path : str
        The path where the generated HTML page will be saved.

    Returns
    -------
    None

    Notes
    -----
    This function reads the content of the base HTML template file specified by `base_template_path`
    and the child HTML file specified by `child_template_path`. It extracts the title, active tab,
    and content blocks from the child template, replaces the placeholders in the base template with
    the extracted content, and writes the modified content to a new HTML page at the location
    specified by `page_path`.

    Additionally, this function modifies the active tab in the base template to have the "current"
    class, based on the active tab extracted from the child template.

    Examples
    --------
    >>> generate_page('base.html', 'child.html', 'page.html')
    page.html has been generated successfully.
    """
    # Read the content of the base HTML template file
    with open(base_template_path, 'r') as f:
        base_content = f.read()

    # Read the content of the child HTML file
    with open(child_template_path, 'r') as f:
        child_content = f.read()

    # Extract title, active tab, and content from the child HTML file
    title_start = child_content.find('{% block title %}')
    title_end = child_content.find('{% endblock %}', title_start)
    title = child_content[title_start + len('{% block title %}'):title_end].strip()

    active_start = child_content.find('{% block active %}')
    active_end = child_content.find('{% endblock %}', active_start)
    active_tab = child_content[active_start + len('{% block active %}'):active_end].strip()

    content_start = child_content.find('{% block content %}')
    content_end = child_content.find('{% endblock %}', content_start)
    content = child_content[content_start + len('{% block content %}'):content_end].strip()

    # Replace {title} and {content} in base template with extracted content
    new_content = base_content.replace('{title}', title)
    new_content = new_content.replace('{content}', content)

    # Modify active tab in base template with extracted content
    # Split the HTML code into lines
    lines = new_content.split("\n")
    # Iterate over each line
    for i, line in enumerate(lines):
        # Check if the line contains the active tab
        if active_tab in line:
            # Replace <li> with <li class="current">
            lines[i] = line.replace("<li>", '<li class="current">')
    # Join the modified lines back into HTML code
    new_content = "\n".join(lines)

    # Write the new content to the file specified by `page_path`
    with open(page_path, 'w') as f:
        f.write(new_content)

    # Print a message indicating successful generation of the HTML page
    print(f"{page_path} has been generated successfully.")


def copy_files(source_folder, destination_folder):
    """
    Copy all files and subfolders from a source folder to a destination folder.

    Parameters
    ----------
    source_folder : str
       Path to the source folder.

    destination_folder : str
       Path to the destination folder.

    Returns
    -------
    None
    """
    shutil.copytree(source_folder, destination_folder, dirs_exist_ok=True)
    print(f"All files and subfolders copied successfully from '{source_folder}' to '{destination_folder}'.")
    for root, dirs, files in os.walk(destination_folder):
        for file in files:
            print(os.path.join(root, file))


def main(deploy=False):
    """
    Main function for generating HTML pages.

    Parameters
    ----------
    deploy : bool, optional
        Flag indicating whether to deploy the generated HTML pages (default is False).

    Returns
    -------
    None

    Notes
    -----
    If `deploy` is True, the function copies files from the 'dev' folder to the 'docs' folder.
    If `deploy` is False, the function generates HTML pages from templates.

    Examples
    --------
    >>> main(deploy=True)
    Files copied successfully from 'dev' to 'docs'.

    >>> main(deploy=False)
    HTML pages generated successfully in the 'dev' folder.
    """

    if deploy:
        source_folder = Path("dev")
        destination_folder = Path("docs")
        copy_files(source_folder, destination_folder)
        print(f"Files copied successfully from '{source_folder}' to '{destination_folder}'.")
    else:
        template_folder_path = Path("templates")
        destination_folder = Path("dev")
        base_template_file = 'base.html'
        template_files = ['index.html', 'packages.html', 'deliverables.html', 'consortium.html', 'stakeholders.html',
                          'impact.html', 'documents.html', 'events.html', 'publications.html', 'conferences.html',
                          'learning.html', 'project.html']

        for template_file in template_files:
            base_template = template_folder_path / base_template_file
            child_template = template_folder_path / template_file
            page_template = destination_folder / template_file
            generate_page(base_template, child_template, page_template)
        print("HTML pages generated successfully in the 'dev' folder.")


if __name__ == "__main__":
    """
        Execute the main function with deploy option set by user input.

        This block allows the script to be executed as a standalone program.
        When executed, it prompts the user to provide the deploy flag value.
    """
    # deploy_input = input("Deploy? (y/N): ").strip().lower()
    # if deploy_input == 'y':
    #     deploy_flag = True
    # else:
    #     deploy_flag = False
    #
    # main(deploy=deploy_flag)

    main(deploy=False)
    main(deploy=True)
