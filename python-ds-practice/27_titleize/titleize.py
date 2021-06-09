def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """

    title = phrase.split(" ")
    result = []
    for word in title:
        word.lower()
        result.append(word.capitalize())
    
    return " ".join(result)

print(titleize('this is awesome'))
print(titleize('oNLy cAPITALIZe fIRSt'))