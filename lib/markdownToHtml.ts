/**
 * Minimal markdown-to-HTML converter for trusted, controlled content.
 * Handles headings, bold, italic, inline code, fenced code blocks,
 * unordered lists, tables, blockquotes, horizontal rules, and paragraphs.
 */

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/_([^_]+)_/g, '<em>$1</em>');
}

export function markdownToHtml(md: string): string {
  const lines = md.split('\n');
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i] ?? '';

    // Fenced code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !(lines[i] ?? '').startsWith('```')) {
        codeLines.push(escapeHtml(lines[i] ?? ''));
        i++;
      }
      const langAttr = lang ? ` class="language-${lang}"` : '';
      out.push(`<pre><code${langAttr}>${codeLines.join('\n')}</code></pre>`);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      out.push('<hr>');
      i++;
      continue;
    }

    // Headings
    const hMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (hMatch) {
      const level = hMatch[1]!.length;
      out.push(`<h${level}>${renderInline(hMatch[2]!)}</h${level}>`);
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && (lines[i] ?? '').startsWith('> ')) {
        quoteLines.push(renderInline((lines[i] ?? '').slice(2)));
        i++;
      }
      out.push(`<blockquote><p>${quoteLines.join('<br>')}</p></blockquote>`);
      continue;
    }

    // Unordered list
    if (/^[-*]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i] ?? '')) {
        items.push(`<li>${renderInline((lines[i] ?? '').slice(2))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    // Table (header row contains |)
    if (line.startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && (lines[i] ?? '').startsWith('|')) {
        tableLines.push(lines[i] ?? '');
        i++;
      }
      // tableLines[0] = header, tableLines[1] = separator, rest = body rows
      const parseRow = (row: string) =>
        row.split('|').slice(1, -1).map(cell => cell.trim());

      const headerCells = parseRow(tableLines[0] ?? '');
      const bodyRows = tableLines.slice(2);

      const thead = `<thead><tr>${headerCells.map(c => `<th>${renderInline(c)}</th>`).join('')}</tr></thead>`;
      const tbody = `<tbody>${bodyRows.map(row =>
        `<tr>${parseRow(row).map(c => `<td>${renderInline(c)}</td>`).join('')}</tr>`
      ).join('')}</tbody>`;

      out.push(`<table>${thead}${tbody}</table>`);
      continue;
    }

    // Empty line — paragraph break
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraph: collect consecutive non-special lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      (lines[i] ?? '').trim() !== '' &&
      !(lines[i] ?? '').startsWith('#') &&
      !(lines[i] ?? '').startsWith('```') &&
      !(lines[i] ?? '').startsWith('|') &&
      !/^[-*]\s/.test(lines[i] ?? '') &&
      !(lines[i] ?? '').startsWith('> ') &&
      !/^---+$/.test((lines[i] ?? '').trim())
    ) {
      paraLines.push(renderInline(lines[i] ?? ''));
      i++;
    }
    if (paraLines.length > 0) {
      out.push(`<p>${paraLines.join(' ')}</p>`);
    }
  }

  return out.join('\n');
}
