def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    # if we only compared length , this would be done.
    # alternatively..

    a = [int(num) for num in str(num1)]
    b = [int(num) for num in str(num2)]

    # discovered that this breakes if we use .sort() on the list.
    if sorted(a) == sorted(b):
        return True
    return False

print(same_frequency(551122, 221515))
print(same_frequency(321142, 3212215))
print(same_frequency(1212, 2211))



