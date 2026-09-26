"""Gera a apostila de estudo sem alterar o aplicativo.

Requer reportlab e pymupdf no ambiente Python, não no package.json.
Uso: python docs/pdf/gerar_apostila.py
"""
from pathlib import Path
import re
import json
import hashlib
from xml.sax.saxutils import escape

from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, PageBreak,
    Table, TableStyle, Preformatted, Image, KeepTogether, Flowable,
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'output' / 'pdf'
QA = ROOT / 'tmp' / 'pdfs'
OUT.mkdir(parents=True, exist_ok=True)
QA.mkdir(parents=True, exist_ok=True)
PDF = OUT / 'GrupoGame-guia-completo.pdf'
PAGE = (595.276, 841.89)
MARGIN = 46
WIDTH = PAGE[0] - 2 * MARGIN
NAVY = HexColor('#0D133D')
RED = HexColor('#D61649')
INK = HexColor('#23304B')
MUTED = HexColor('#58677D')
PALE = HexColor('#F0F3F9')

fonts = Path('C:/Windows/Fonts')
for name, file in [('Body','arial.ttf'),('BodyBold','arialbd.ttf'),('BodyItalic','ariali.ttf'),('Mono','consola.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(fonts/file)))
pdfmetrics.registerFontFamily('Body', normal='Body', bold='BodyBold', italic='BodyItalic', boldItalic='BodyBold')

ST = {
    'body': ParagraphStyle('body', fontName='Body', fontSize=10.5, leading=15.4, textColor=INK, spaceAfter=9),
    'h1': ParagraphStyle('h1', fontName='BodyBold', fontSize=23, leading=29, textColor=NAVY, spaceAfter=20, keepWithNext=True),
    'h2': ParagraphStyle('h2', fontName='BodyBold', fontSize=14, leading=19, textColor=NAVY, spaceBefore=14, spaceAfter=8, keepWithNext=True),
    'h3': ParagraphStyle('h3', fontName='BodyBold', fontSize=11, leading=15, textColor=RED, spaceBefore=10, spaceAfter=6, keepWithNext=True),
    'small': ParagraphStyle('small', fontName='Body', fontSize=8.6, leading=12, textColor=MUTED, spaceAfter=8),
    'table': ParagraphStyle('table', fontName='Body', fontSize=9, leading=12.4, textColor=INK),
    'tablehead': ParagraphStyle('tablehead', fontName='BodyBold', fontSize=9, leading=12.4, textColor=white),
    'code': ParagraphStyle('code', fontName='Mono', fontSize=8.6, leading=12.1, textColor=NAVY, backColor=PALE,
                           borderPadding=10, spaceBefore=6, spaceAfter=12),
    'source': ParagraphStyle('source', fontName='Mono', fontSize=8.1, leading=11.2, textColor=INK, spaceAfter=0),
    'callout': ParagraphStyle('callout', fontName='Body', fontSize=10.2, leading=15, textColor=NAVY,
                              backColor=PALE, borderPadding=12, spaceBefore=10, spaceAfter=18),
}

def inline(s):
    s = s.replace('\u2011','-').replace('\u2013','-').replace('\u2014','-')
    s = escape(s)
    s = re.sub(r'`([^`]+)`', r'<font name="Mono" size="9">\1</font>', s)
    s = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', s)
    s = re.sub(r'\[([^]]+)\]\((https?://[^)]+)\)', r'<link href="\2" color="#254FA8">\1</link>', s)
    return s

class Doc(BaseDocTemplate):
    def __init__(self, *a, **kw):
        super().__init__(*a, **kw)
        frame = Frame(MARGIN, 48, WIDTH, PAGE[1]-110, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
        self.addPageTemplates(PageTemplate(id='main', frames=frame, onPage=self.decorate))
        self.heading = 'Guia de estudo'
        self.chapters = []
    def beforeDocument(self):
        self.heading = 'Guia de estudo'
        self.chapters = []
    def decorate(self, canvas, doc):
        if doc.page == 1:
            return
        canvas.saveState()
        canvas.setStrokeColor(HexColor('#D8DFEA'))
        canvas.line(MARGIN, PAGE[1]-39, PAGE[0]-MARGIN, PAGE[1]-39)
        canvas.setFont('BodyBold', 8)
        canvas.setFillColor(NAVY)
        canvas.drawString(MARGIN, PAGE[1]-29, 'GRUPOGAME  /  PROJETO EXPLICADO')
        canvas.setFont('Body', 8)
        canvas.setFillColor(MUTED)
        canvas.drawString(MARGIN, 29, 'React Native + Expo + TypeScript  |  Material acadêmico')
        canvas.drawRightString(PAGE[0]-MARGIN, 29, str(doc.page))
        canvas.restoreState()
    def afterFlowable(self, f):
        if isinstance(f, Paragraph) and getattr(f, 'toc_title', None):
            key = f.toc_key
            self.canv.bookmarkPage(key)
            self.canv.addOutlineEntry(f.toc_title, key, level=0)
            self.notify('TOCEntry',(0,f.toc_title,self.page,key))
            self.chapters.append({'title':f.toc_title,'page':self.page})

class Cover(Flowable):
    def __init__(self):
        super().__init__()
        self.width=WIDTH
        self.height=700
    def draw(self):
        c=self.canv
        c.saveState()
        c.setFillColor(NAVY)
        c.rect(-MARGIN,-94,PAGE[0],PAGE[1]+30,fill=1,stroke=0)
        c.setFillColor(RED)
        c.rect(0,585,58,6,fill=1,stroke=0)
        c.setFillColor(HexColor('#BAC6EA'))
        c.setFont('BodyBold',11)
        c.drawString(0,612,'DOSSIÊ DO PROJETO  /  GUIA PARA APRESENTAÇÃO')
        c.setFillColor(white)
        c.setFont('BodyBold',44)
        c.drawString(0,510,'GrupoGame')
        c.setFont('BodyBold',27)
        c.drawString(0,462,'Do código à explicação')
        c.setFillColor(HexColor('#CCD6EF'))
        lines=['Arquitetura, telas, componentes e decisões.',
               'Teoria aplicada, exemplos comentados e código completo.',
               'Um material para entender, demonstrar e defender o projeto.']
        c.setFont('Body',12)
        for i,line in enumerate(lines):c.drawString(0,407-i*24,line)
        labels=[('01','ENTENDER','Pastas, tecnologias e responsabilidades'),('02','ACOMPANHAR','Estado, eventos, navegação e interface'),('03','EXPLICAR','Roteiro, perguntas e código de consulta')]
        for i,(num,title,sub) in enumerate(labels):
            y=266-i*67
            c.setFillColor(RED);c.setFont('BodyBold',20);c.drawString(0,y,num)
            c.setFillColor(white);c.setFont('BodyBold',11);c.drawString(48,y+5,title)
            c.setFillColor(HexColor('#BAC6EA'));c.setFont('Body',10);c.drawString(48,y-14,sub)
        c.setFillColor(HexColor('#BAC6EA'));c.setFont('Body',9)
        c.drawString(0,18,'EDIÇÃO 24.09.2026  |  Baseada no código local comentado')
        c.drawString(0,0,'Expo SDK 57  •  React Native 0.86  •  React 19  •  TypeScript 6')
        c.restoreState()

class Diagram(Flowable):
    def __init__(self, kind):
        super().__init__(); self.kind=kind; self.width=WIDTH; self.height=240 if kind=='architecture' else 192
    def draw(self):
        c=self.canv
        def box(x,y,w,h,title,sub):
            c.setFillColor(PALE);c.setStrokeColor(HexColor('#CCD5E7'));c.roundRect(x,y,w,h,7,fill=1,stroke=1)
            c.setFillColor(NAVY);c.setFont('BodyBold',11);c.drawCentredString(x+w/2,y+h-22,title)
            c.setFont('Body',8.5);c.setFillColor(MUTED);c.drawCentredString(x+w/2,y+14,sub)
        def arrow(x,y,a,b,label=None):
            c.setStrokeColor(RED);c.setLineWidth(1.5);c.line(x,y,a,b)
            import math
            angle=math.atan2(b-y,a-x)
            for d in (-.45,.45):c.line(a,b,a-7*math.cos(angle+d),b-7*math.sin(angle+d))
            if label:c.setFont('Body',8);c.setFillColor(MUTED);c.drawCentredString((x+a)/2+25,(y+b)/2,label)
        if self.kind=='architecture':
            box(150,165,205,58,'src/app','Rotas, estado e coordenação')
            box(0,40,155,65,'src/components','Interface e callbacks')
            box(175,40,155,65,'src/data','Tipos e dados locais')
            box(350,40,150,65,'assets','Imagens e fontes')
            arrow(208,165,76,107,'props');arrow(252,165,252,107,'consulta');arrow(299,165,425,107,'recursos')
            c.setFont('Body',9);c.setFillColor(MUTED);c.drawCentredString(WIDTH/2,10,'As ações dos componentes retornam à tela por callbacks.')
        else:
            box(0,105,125,58,'Login','replace /home')
            box(185,105,125,58,'Home','Centro de navegação')
            box(375,105,125,58,'Detalhes','/servidor/[id]')
            box(185,5,125,58,'Agendar','/agendar + modal')
            arrow(125,134,182,134);arrow(310,134,372,134);arrow(247,103,247,66)
            c.setFont('Body',8.5);c.setFillColor(MUTED)
            c.drawString(332,79,'back retorna à Home')
            c.drawString(0,34,'Avatar da Home:')
            c.drawString(0,18,'confirmar saída → Login')

def table(rows):
    n=len(rows[0]); widths=[WIDTH/n]*n
    if n==2:widths=[WIDTH*.31,WIDTH*.69]
    if n==3:widths=[WIDTH*.24,WIDTH*.35,WIDTH*.41]
    cells=[[Paragraph(inline(x.strip()),ST['tablehead' if i==0 else 'table']) for x in row] for i,row in enumerate(rows)]
    t=Table(cells,colWidths=widths,repeatRows=1,hAlign='LEFT')
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),NAVY),('VALIGN',(0,0),(-1,-1),'TOP'),
                           ('ROWBACKGROUNDS',(0,1),(-1,-1),[white,PALE]),('LEFTPADDING',(0,0),(-1,-1),9),
                           ('RIGHTPADDING',(0,0),(-1,-1),9),('TOPPADDING',(0,0),(-1,-1),8),
                           ('BOTTOMPADDING',(0,0),(-1,-1),8),('LINEBELOW',(0,-1),(-1,-1),.5,HexColor('#D8DFEA'))]))
    return [t,Spacer(1,12)]

def code(text, source=False):
    style=ST['source' if source else 'code']
    # Quebras são apenas visuais: números do apêndice continuam sendo os da linha original.
    out=[]
    width=WIDTH-(12 if source else 22)
    for i,line in enumerate(text.splitlines(),1):
        line=line.expandtabs(2)
        prefix=f'{i:>3}  ' if source else ''
        while pdfmetrics.stringWidth(prefix+line,'Mono',style.fontSize)>width:
            k=len(line)
            while k>1 and pdfmetrics.stringWidth(prefix+line[:k],'Mono',style.fontSize)>width:k-=1
            cut=line.rfind(' ',max(1,int(k*.6)),k)
            if cut>0:k=cut+1
            out.append(prefix+line[:k]);line=line[k:];prefix='     ' if source else '  '
        out.append(prefix+line)
    return Preformatted('\n'.join(out),style)

story=[Cover(),PageBreak()]
story.append(Paragraph('Sumário',ST['h1']))
story.append(Paragraph('Use os capítulos para estudar e os marcadores do PDF para localizar cada arquivo do apêndice. A numeração abaixo é a página física do documento.',ST['body']))
toc=TableOfContents()
toc.levelStyles=[ParagraphStyle('toc',fontName='Body',fontSize=9.1,leading=12.4,spaceBefore=5,textColor=INK)]
story.append(toc)
chapter_count=0
def chapter(title):
    global chapter_count
    chapter_count+=1
    story.append(PageBreak())
    p=Paragraph(inline(title),ST['h1']);p.toc_title=title;p.toc_key=f'chapter-{chapter_count}'
    story.append(p)

def reference_images(files):
    cellwidth=WIDTH/len(files)
    cells=[]
    for fname in files:
        p=ROOT/'referencias'/fname
        w,h=ImageReader(str(p)).getSize()
        maxw=cellwidth-18;maxh=340
        ratio=min(maxw/w,maxh/h)
        cells.append([Image(str(p),width=w*ratio,height=h*ratio),Spacer(1,8),Paragraph(inline(fname),ST['small'])])
    t=Table([cells],colWidths=[cellwidth]*len(files));t.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP')]))
    story.append(t)
    story.append(Paragraph('Fonte: imagens locais de referencias/. São protótipos fornecidos, não capturas do aplicativo executado.',ST['small']))

lines=(ROOT/'docs'/'14-apostila-completa.md').read_text(encoding='utf-8').splitlines()
i=0
while i<len(lines):
    line=lines[i].strip()
    if not line:i+=1;continue
    if line.startswith('# '):chapter(line[2:]);i+=1;continue
    if line.startswith('### '):story.append(Paragraph(inline(line[4:]),ST['h3']));i+=1;continue
    if line.startswith('## '):story.append(Paragraph(inline(line[3:]),ST['h2']));i+=1;continue
    if line.startswith('```'):
        j=i+1
        while j<len(lines) and not lines[j].startswith('```'):j+=1
        story.append(code('\n'.join(lines[i+1:j])));i=j+1;continue
    if line.startswith('@diagram '):story.append(Diagram(line.split()[1]));i+=1;continue
    if line.startswith('@images '):reference_images(line[8:].split('|'));i+=1;continue
    if line=='@page':story.append(PageBreak());i+=1;continue
    if line.startswith('|'):
        rows=[]
        while i<len(lines) and lines[i].strip().startswith('|'):
            row=lines[i].strip().strip('|').split('|')
            if not all(re.fullmatch(r'[\s:-]+',c) for c in row):rows.append(row)
            i+=1
        story.extend(table(rows));continue
    if line.startswith('> '):story.append(Paragraph(inline(line[2:]),ST['callout']));i+=1;continue
    if re.match(r'^(- |\d+\. )',line):
        m=re.match(r'^(- |\d+\. )(.*)',line)
        label='•' if m[1]=='- ' else m[1].strip()
        p=Paragraph(inline(m[2]),ParagraphStyle('list',parent=ST['body'],leftIndent=14,firstLineIndent=0,bulletIndent=0),bulletText=label)
        story.append(p);i+=1;continue
    text=[line];i+=1
    while i<len(lines) and lines[i].strip() and not re.match(r'^(#|```|\||>|@|- |\d+\. )',lines[i]):
        text.append(lines[i].strip());i+=1
    story.append(Paragraph(inline(' '.join(text)),ST['body']))

sources=[
 ('src/app/_layout.tsx','Inicialização, fontes e Stack'),
 ('src/app/index.tsx','Tela de Login'),('src/app/home.tsx','Tela Home'),
 ('src/app/servidor/[id].tsx','Detalhes do servidor'),('src/app/agendar.tsx','Formulário Agendar'),
 ('src/components/category-card.tsx','Cartão de categoria'),('src/components/appointment-card.tsx','Cartão de partida'),
 ('src/components/screen-header.tsx','Cabeçalho'),('src/components/player-item.tsx','Jogador'),
 ('src/components/server-select-modal.tsx','Seleção de servidor'),('src/components/sign-out-modal.tsx','Confirmação de saída'),
 ('src/data/home.ts','Dados de Home e categorias'),('src/data/servers.ts','Servidores e jogadores'),
 ('package.json','Dependências e comandos'),('tsconfig.json','Configuração do TypeScript'),('app.json','Configuração do Expo'),
]
manifest=[]
for n,(file,desc) in enumerate(sources,1):
    chapter(f'A{n:02}. {desc}')
    text=(ROOT/file).read_text(encoding='utf-8-sig')
    story.append(Paragraph(inline(f'**Arquivo:** `{file}`'),ST['body']))
    story.append(Paragraph('Transcrição integral do arquivo local nesta edição. A coluna da esquerda numera as linhas originais; continuações visuais não recebem outro número. Não copie a numeração para o editor.',ST['small']))
    story.append(code(text,source=True))
    manifest.append({'path':file,'sha256':hashlib.sha256((ROOT/file).read_bytes()).hexdigest(),'lines':len(text.splitlines())})

doc=Doc(str(PDF),pagesize=PAGE,title='GrupoGame - projeto explicado e código completo',author='GrupoGame | Material de estudo',subject='Arquitetura, React Native, Expo e TypeScript')
doc.multiBuild(story)
(OUT/'fontes-da-apostila.json').write_text(json.dumps({'date':'2026-09-24','sources':manifest,'chapters':doc.chapters},ensure_ascii=False,indent=2),encoding='utf-8')

# Renderização de todas as páginas e folhas de contato para revisão visual.
import pymupdf
from PIL import Image as PILImage, ImageDraw, ImageFont
pdf=pymupdf.open(PDF)
thumbs=[]
issues=[]
for idx,page in enumerate(pdf):
    pix=page.get_pixmap(matrix=pymupdf.Matrix(1.35,1.35),alpha=False)
    path=QA/f'page-{idx+1:03}.png';pix.save(str(path))
    pic=PILImage.open(path);pic.thumbnail((248,351))
    tile=PILImage.new('RGB',(268,383),'#dce2ec');tile.paste(pic,((268-pic.width)//2,8))
    draw=ImageDraw.Draw(tile);draw.text((12,363),f'Página {idx+1}',fill='#0D133D')
    thumbs.append(tile)
    if not page.get_text().strip():issues.append(f'Página sem texto extraível: {idx+1}')
    for block in page.get_text('dict')['blocks']:
        if block['type']!=0:continue
        for line in block['lines']:
            for span in line['spans']:
                x0,y0,x1,y1=span['bbox']
                if x0 < 0 or y0 < 0 or x1 > page.rect.width+1 or y1 > page.rect.height+1:
                    issues.append(f'Texto fora da página {idx+1}: {span["text"][:50]}')
for start in range(0,len(thumbs),12):
    group=thumbs[start:start+12];sheet=PILImage.new('RGB',(268*3,383*4),'#dce2ec')
    for j,tile in enumerate(group):sheet.paste(tile,((j%3)*268,(j//3)*383))
    sheet.save(QA/f'contact-{start//12+1:02}.png')
report={'pages':len(pdf),'chapters':len(doc.chapters),'issues':issues,'output':str(PDF),'bytes':PDF.stat().st_size}
(QA/'qa-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False))
