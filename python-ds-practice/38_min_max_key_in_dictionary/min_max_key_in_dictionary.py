def min_max_keys(d):
    """Return tuple (min-keys, max-keys) in d.

        >>> min_max_keys({2: 'a', 7: 'b', 1: 'c', 10: 'd', 4: 'e'})
        (1, 10)

    Works with any kind of key that can be compared, like strings:

        >>> min_max_keys({"apple": "red", "cherry": "red", "berry": "blue"})
        ('apple', 'cherry')
    """
    min_ = None
    max_ = None

    for key in d:
        if not min_ and not max_:
            min_ = key
            max_ = key
        if min_ and min_ >= key:
           min_ = key
        
        elif max_ and max_ <= key:
            max_ = key
       
    return (min_, max_)

print(min_max_keys({2: 'a', 7: 'b', 1: 'c', 10: 'd', 4: 'e'}))
print(min_max_keys({"apple": "red", "cherry": "red", "berry": "blue"}))
