def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    new_phrase = ""
    for letter in phrase:
        if letter.lower() == to_swap.lower():
            if letter.isupper():
                new_phrase += letter.lower()
            elif letter.islower():
                new_phrase += letter.upper()

        else:
            new_phrase += letter
    
    return new_phrase

print(flip_case('Aaaahhh', 'a'))
print(flip_case('Aaaahhh', 'A'))
print(flip_case('Aaaahhh', 'h'))