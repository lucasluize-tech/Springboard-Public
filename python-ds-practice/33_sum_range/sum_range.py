def sum_range(nums, start=0, end=None):
    """Return sum of numbers from start...end.

    - start: where to start (if not provided, start at list start)
    - end: where to stop (include this index) (if not provided, go through end)

        >>> nums = [1, 2, 3, 4]

        >>> sum_range(nums)
        10

        >>> sum_range(nums, 1)
        9

        >>> sum_range(nums, end=2)
        6

        >>> sum_range(nums, 1, 3)
        9

    If end is after end of list, just go to end of list:

        >>> sum_range(nums, 1, 99)
        9
    """

    result = 0
    if end != None and end > len(nums):
        end = None

    if start != 0 and end != None:
        for num in nums[start:end+1]:
            result += num
        return result
    elif start != 0:
        for num in nums[start:]:
            result += num
        return result
    
    elif end != None:
        for num in nums[:end+1]:
            result += num
        return result
    
    for num in nums:
        result += num

    return result

nums = [1, 2, 3, 4]
print(sum_range(nums))
print(sum_range(nums, 1))
print(sum_range(nums, end=2))
print(sum_range(nums, 1, 3))
print(sum_range(nums, 1 ,99))