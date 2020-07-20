from logzero import logger as log


def multiply(val):
    """ A fake map function
    """
    log.info("this is a value before multiplication: %s", val)
    newval = val * 2

    log.warning("Fake processing...: val=%s -> newval=%s", val, newval)

    log.info("this is a value after multiplication: %s", newval)
    return newval
