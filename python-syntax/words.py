def print_capitalized_words(words, start_with={"e","E"}):
    """ Print Capitalized words in list"""

    for word in words:
        for letter in start_with:
            if word.startswith(letter):
                print(f"{word.capitalize()}")

print_capitalized_words(["hello", "hey", "goodbye", "yo", "yes"],
                   start_with={"h", "y"})