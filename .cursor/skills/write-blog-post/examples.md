# Post markup examples

## Encoded TypeScript snippet

Source:

```typescript
export type MyButtonPublicProps = MyButtonOwnProps & NativeButtonProps
```

In the post:

```html
<pre class="line-numbers theme-okaidia language-typescript" data-show-toolbar="yes">
<code class="language-typescript">export type MyButtonPublicProps = MyButtonOwnProps &amp; NativeButtonProps</code></pre>
```

## Encoded HTML snippet

Source:

```html
<button :disabled="isDisabled">
  {{ isSaving ? 'Guardando…' : 'Guardar' }}
</button>
```

In the post:

```html
<code class="language-html">&lt;button :disabled=&quot;isDisabled&quot;&gt;
  &#123;&#123; isSaving ? &#x27;Guardando…&#x27; : &#x27;Guardar&#x27; &#125;&#125;
&lt;/button&gt;</code>
```

## External links in copy

```html
<a href="https://github.com/gervisbermudez/example"><i class="fab fa-github"></i> repo</a>
<a href="https://example.vercel.app/"><i class="fas fa-rocket"></i> live demo</a>
```
