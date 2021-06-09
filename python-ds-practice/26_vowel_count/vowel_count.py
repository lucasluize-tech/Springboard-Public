def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}
        
        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    letters = [letter for letter in phrase.lower() if letter in "aeiou"]
    
    result = {}
    for letter in letters:
        if letter not in result:
            result[letter] = 1
        else:
            result[letter] += 1
    return result

print(vowel_count('rithm school'))
print(vowel_count('HOW ARE YOU? i am great!') )