const fs = require('fs');

const edits = [
  ['src/components/InternshipsSection.tsx', [
    ['  gains?: string[];\n  image: string | null;\n};', '  gains?: string[];\n  image: string | null;\n  pdf_url: string | null;\n};'],
    ['    image: i.image_url,\n  }));', '    image: i.image_url,\n    pdf_url: i.pdf_url,\n  }));'],
  ]],
  ['src/components/StudyDestinations.tsx', [
    ['  visa: string;\n  services: string[];\n};', '  visa: string;\n  services: string[];\n  pdfUrl: string | null;\n};'],
    ['    services: destination.services ?? [],\n  }));', '    services: destination.services ?? [],\n    pdfUrl: destination.pdf_url,\n  }));'],
  ]],
];

for (const [path, pairs] of edits) {
  let s = fs.readFileSync(path, 'utf8');
  for (const [from, to] of pairs) {
    if (!s.includes(from)) throw new Error(`${path}: missing\n${from}`);
    s = s.replace(from, to);
  }
  fs.writeFileSync(path, s);
  console.log(`${path}: patched`);
}
