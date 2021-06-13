"""Word Finder: finds random words from a dictionary."""
import random

class WordFinder:

    def __init__(self, path):
        file = open(path, "r")
        self.list = [letter for letter in file]
        self.num_of_words = len(self.list)
        file.close

        print(f"{self.num_of_words} words read")

    def random(self):
        return random.choice(self.list).strip()

    


