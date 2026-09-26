# Gerar a apostila

O PDF já pronto está em `output/pdf/GrupoGame-guia-completo.pdf`. Não é necessário executar o gerador para abrir ou estudar o material.

O arquivo `gerar_apostila.py` usa `reportlab` para criar o PDF e `pymupdf` para revisar as páginas. Essas ferramentas são temporárias do processo de documentação e não pertencem às dependências do aplicativo Expo.

## Windows com `uv`

Na raiz do projeto, execute:

```powershell
$env:UV_CACHE_DIR = "$env:TEMP\grupogame-pdf-cache"
$env:UV_PYTHON_INSTALL_DIR = "$env:TEMP\grupogame-pdf-python"
uv run --no-project --python 3.12 --with reportlab --with pymupdf --with pypdf python docs/pdf/gerar_apostila.py
```

O primeiro uso pode baixar um Python temporário e os pacotes de documentação. Nada é instalado em `package.json` ou `node_modules`.

## Windows com Python já instalado

Se `reportlab` e `pymupdf` já estiverem disponíveis:

```powershell
python docs/pdf/gerar_apostila.py
```

Se aparecer `ModuleNotFoundError`, use o comando com `uv` acima. Se `python` ou `uv` não forem reconhecidos, abra diretamente o PDF pronto; o aplicativo não depende do gerador.

## Saídas

- `output/pdf/GrupoGame-guia-completo.pdf`: apostila final.
- `output/pdf/fontes-da-apostila.json`: hashes e quantidade de linhas dos arquivos transcritos.

O gerador também pode criar imagens de revisão em `tmp/pdfs`. Essa pasta é temporária e pode ser removida depois da conferência.
