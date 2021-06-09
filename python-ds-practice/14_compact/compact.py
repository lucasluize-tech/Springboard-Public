def compact(lst):
    """Return a copy of lst with non-true elements removed.

        >>> compact([0, 1, 2, '', [], False, (), None, 'All done'])
        [1, 2, 'All done']
    """
    #short
    copy = [true for true in lst if true ]

    #long
    ''' 
    copy = []

    for true_elements in lst:
        if true_elements:
            copy.append(true_elements) 
            '''
    return copy

print(compact([0, 1, 2, '', [], False, (), None, 'All done']))