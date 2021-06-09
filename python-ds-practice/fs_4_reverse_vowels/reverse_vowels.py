def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which are not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """

    vowels = [v for v in s if v in "aeiouAEIOU"]
    count = len(vowels)-1
    result = ""
    for letter in s:
        if letter in vowels:
            result += vowels[count]
            count -= 1
        else:
            result += letter

    return result

print(reverse_vowels("Hello!"))
print(reverse_vowels("Tomatoes"))
print(reverse_vowels("Reverse Vowels In A String"))
print(reverse_vowels("aeiou"))
print(reverse_vowels("why try, shy fly?"))