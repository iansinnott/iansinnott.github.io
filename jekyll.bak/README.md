# The Blog of Ian Sinnott

I write about stuff & things

## Todo:

- Import posts from current blog
- Add disqus comments
- Make the `post` command able to actually commit (with message) and then push the changes to github.

## Troubleshooting

### Permalinks

Links were broken initially with the following code:

```
<a href="{{ site.baseurl }}{{ post.url }}">
```

Replacing that line in `index.html` with the following fixed the issue:

```
<a href="{{ post.url }}">
```

Still, it's a strange issue since the `baseurl` was set to `/` the whole time. Just something to note for future reference.
