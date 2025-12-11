import { AceMarkdown, type AceMarkdownProps } from '@ace/aceMarkdown'


export function Browser(props: AceMarkdownProps) {
  return <>
    <div class="browser">
      <div class="dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>

      <AceMarkdown {...props} />
    </div>
  </>
}
