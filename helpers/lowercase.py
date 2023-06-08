import os
import shutil


def to_lower_case(directory):
    for filename in os.listdir(directory):
        lowercase_filename = filename.lower()
        if lowercase_filename != filename:
            shutil.move(
                os.path.join(directory, filename),
                os.path.join(directory, lowercase_filename)
            )


# call the function with your directory
to_lower_case(".")
