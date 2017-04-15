# Writing parsers

There might be scenarios where you need some custom parsers for the `matchValue`. This guide will show you how to.

```
module.exports = () => {
	return {
		add(matchValue) {},
		parse(matchValue) {}
	}
}
```

A parser needs to return an object with two methods. `add` and `parse`. Whenever you add middleware via the `run` function the `add` method will be called and you can handle the given `matchValue` and store it in you parser. 

When later on the update event is been called the `matchValue` will go to the `parse` method. The parse method has to return an object. with the following signature.

```
{ path : 'stringValue', parameters : {} }
```

The `path` property should be the value that should be the final `matchValue` that you want to match on in the `run` method. Parameters is an object with all the dynamic parts that you have taken from the `matchValue` that came from the update function.