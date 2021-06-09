def list_check(lst):
    """Are all items in lst a list?

        >>> list_check([[1], [2, 3]])
        True

        >>> list_check([[1], "nope"])
        False
    """
    check = True
    for l in lst:
        if type(l) is not list:
            check = False
            
    return check

print(list_check([[1], [2, 3]]))
print(list_check([[1], "nope"]))