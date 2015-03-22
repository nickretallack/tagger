def firsts(items):
	return [item[0] for item in items]

def index_by_attribute(items, attribute):
	result = {}
	for item in items:
		result[getattr(item, attribute)] = item
	return result
