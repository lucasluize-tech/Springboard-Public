def valid_parentheses(parens):
    """Are the parentheses validly balanced?

        >>> valid_parentheses("()")
        True

        >>> valid_parentheses("()()")
        True

        >>> valid_parentheses("(()())")
        True

        >>> valid_parentheses(")()")
        False

        >>> valid_parentheses("())")
        False

        >>> valid_parentheses("((())")
        False

        >>> valid_parentheses(")()(")
        False
    """
    _open = [symbol for symbol in parens if symbol =="("]
    _close = [symbol for symbol in parens if symbol ==")"]

    if parens.startswith(")"):
            return False
    if len(_open) == len(_close):
        return True
    return False
    
print(valid_parentheses("()"))
print(valid_parentheses("()()"))
print(valid_parentheses("(()())"))
print(valid_parentheses("())"))
print(valid_parentheses("((())"))
print(valid_parentheses(")()("))
print(valid_parentheses(")()"))
