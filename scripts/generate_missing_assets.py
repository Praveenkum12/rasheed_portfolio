import os
from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parent.parent / 'public' / 'images'

def make_fire_asset(out_path, width=1600, height=1200):
    out_path.parent.mkdir(parents=True, exist_ok=True)
    # Industrial fire safety composition: deep navy/charcoal workshop background with dramatic crimson/amber backlighting
    # and a sharp industrial fire safety inspection atmosphere
    base = Image.new('RGB', (width, height), (10, 14, 22))
    draw = ImageDraw.Draw(base)
    
    # Atmospheric industrial gradients
    for y in range(height):
        # Blue hour to dark floor
        r = int(12 + (y / height) * 6)
        g = int(18 + (y / height) * 8)
        b = int(32 - (y / height) * 12)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
        
    # Dramatic amber/crimson keylight
    glow = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    
    # Warm amber spotlight from top right
    for rad in range(600, 0, -10):
        alpha = int(45 * (1 - rad / 600))
        gdraw.ellipse([width * 0.7 - rad, height * 0.2 - rad, width * 0.7 + rad, height * 0.2 + rad], fill=(245, 158, 11, alpha))
        
    # Crimson emergency glow on left
    for rad in range(500, 0, -10):
        alpha = int(55 * (1 - rad / 500))
        gdraw.ellipse([width * 0.35 - rad, height * 0.45 - rad, width * 0.35 + rad, height * 0.45 + rad], fill=(220, 38, 38, alpha))
        
    # Emergency exit green beacon in background
    for rad in range(160, 0, -8):
        alpha = int(70 * (1 - rad / 160))
        gdraw.ellipse([width * 0.15 - rad, height * 0.22 - rad, width * 0.15 + rad, height * 0.22 + rad], fill=(16, 185, 129, alpha))
    gdraw.rectangle([width * 0.13, height * 0.20, width * 0.17, height * 0.24], fill=(16, 185, 129, 210))

    base = base.convert('RGBA')
    base = Image.alpha_composite(base, glow)
    
    # Add industrial structural elements (pillars, pipes, extinguisher cylinder silhouette)
    sdraw = ImageDraw.Draw(base)
    # Background pipe racks
    sdraw.line([(0, height * 0.18), (width, height * 0.18)], fill=(40, 52, 68, 180), width=18)
    sdraw.line([(0, height * 0.26), (width, height * 0.26)], fill=(30, 42, 56, 160), width=12)
    sdraw.line([(width * 0.52, 0), (width * 0.52, height)], fill=(25, 35, 48, 140), width=24)
    
    # Red fire extinguisher body with metallic reflections
    cx, cy = int(width * 0.48), int(height * 0.6)
    cyl_w, cyl_h = int(width * 0.22), int(height * 0.55)
    
    for x_off in range(cyl_w):
        # Cylinder specular curve
        norm_x = (x_off / cyl_w) * 2 - 1
        specular = max(0, 1 - abs(norm_x - 0.2) * 2.2)
        base_r = int(180 + 75 * specular)
        base_g = int(24 + 40 * specular)
        base_b = int(24 + 40 * specular)
        if norm_x < -0.7 or norm_x > 0.8:
            base_r = int(base_r * 0.5)
            base_g = int(base_g * 0.5)
            base_b = int(base_b * 0.5)
        sdraw.rectangle([cx - cyl_w//2 + x_off, cy - cyl_h//2, cx - cyl_w//2 + x_off + 1, cy + cyl_h//2], fill=(base_r, base_g, base_b, 255))
        
    # Extinguisher cap and brass valve
    sdraw.rectangle([cx - 40, cy - cyl_h//2 - 50, cx + 40, cy - cyl_h//2], fill=(45, 52, 60, 255))
    sdraw.ellipse([cx - 30, cy - cyl_h//2 - 75, cx + 30, cy - cyl_h//2 - 35], fill=(217, 119, 6, 255)) # brass
    # Pressure gauge
    sdraw.ellipse([cx + 35, cy - cyl_h//2 - 65, cx + 85, cy - cyl_h//2 - 15], fill=(230, 235, 240, 255))
    sdraw.ellipse([cx + 40, cy - cyl_h//2 - 60, cx + 80, cy - cyl_h//2 - 20], fill=(20, 25, 30, 255))
    sdraw.ellipse([cx + 46, cy - cyl_h//2 - 54, cx + 74, cy - cyl_h//2 - 26], fill=(16, 185, 129, 255)) # green zone
    sdraw.line([(cx + 60, cy - cyl_h//2 - 40), (cx + 68, cy - cyl_h//2 - 48)], fill=(245, 158, 11, 255), width=2) # needle
    
    # Inspection tag
    sdraw.polygon([(cx - 75, cy - cyl_h//2 + 40), (cx - 20, cy - cyl_h//2 + 25), (cx - 10, cy - cyl_h//2 + 130), (cx - 65, cy - cyl_h//2 + 145)], fill=(245, 245, 245, 240))
    sdraw.line([(cx - 70, cy - cyl_h//2 + 55), (cx - 25, cy - cyl_h//2 + 45)], fill=(220, 38, 38, 255), width=4)
    sdraw.line([(cx - 65, cy - cyl_h//2 + 75), (cx - 20, cy - cyl_h//2 + 65)], fill=(80, 90, 100, 255), width=2)
    sdraw.line([(cx - 62, cy - cyl_h//2 + 95), (cx - 18, cy - cyl_h//2 + 85)], fill=(80, 90, 100, 255), width=2)
    
    # Film grain & lens blur
    final = base.convert('RGB')
    final = final.filter(ImageFilter.GaussianBlur(radius=0.7))
    
    # Subtle dark vignette
    vig = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    vdraw = ImageDraw.Draw(vig)
    for y in range(height):
        alpha = int(220 * max(0, (y - height * 0.45) / (height * 0.55)))
        vdraw.line([(0, y), (width, y)], fill=(8, 13, 19, alpha))
    final = Image.alpha_composite(final.convert('RGBA'), vig).convert('RGB')
    
    final.save(out_path, 'WEBP', quality=82)
    print(f'Generated {out_path.name} at {width}x{height}')


def make_5s_asset(out_path, width=1400, height=960):
    out_path.parent.mkdir(parents=True, exist_ok=True)
    # Spotless 5S industrial workshop with shadow boards & yellow floor demarcation lines
    base = Image.new('RGB', (width, height), (16, 22, 32))
    draw = ImageDraw.Draw(base)
    
    # Workshop walls and floor
    for y in range(height):
        if y < height * 0.45:
            # Clean grey workshop wall
            shade = int(28 + (y / (height * 0.45)) * 14)
            draw.line([(0, y), (width, y)], fill=(shade, shade + 4, shade + 10))
        else:
            # Polished reflective concrete floor
            prog = (y - height * 0.45) / (height * 0.55)
            shade = int(14 + prog * 10)
            draw.line([(0, y), (width, y)], fill=(shade, shade + 3, shade + 8))
            
    # Yellow floor demarcation safety lines
    draw.polygon([(width * 0.15, height * 0.45), (width * 0.22, height), (width * 0.26, height), (width * 0.17, height * 0.45)], fill=(245, 158, 11))
    draw.polygon([(width * 0.85, height * 0.45), (width * 0.78, height), (width * 0.74, height), (width * 0.83, height * 0.45)], fill=(245, 158, 11))
    draw.polygon([(width * 0.15, height * 0.45), (width * 0.85, height * 0.45), (width * 0.85, height * 0.47), (width * 0.15, height * 0.47)], fill=(245, 158, 11))
    
    # Tool shadow board on wall
    draw.rectangle([width * 0.32, height * 0.08, width * 0.68, height * 0.42], fill=(20, 28, 40), outline=(245, 158, 11), width=3)
    # Perforated pegboard grid
    for px in range(int(width * 0.34), int(width * 0.66), 18):
        for py in range(int(height * 0.10), int(height * 0.40), 18):
            draw.rectangle([px, py, px + 2, py + 2], fill=(10, 15, 22))
            
    # Tool shadows (wrenches, spanners, calipers)
    for i, tx in enumerate(range(int(width * 0.36), int(width * 0.64), 38)):
        h_len = 50 + (i % 4) * 20
        draw.rectangle([tx, height * 0.14, tx + 12, height * 0.14 + h_len], fill=(245, 158, 11, 230))
        draw.ellipse([tx - 4, height * 0.13, tx + 16, height * 0.17], fill=(245, 158, 11, 230))
        # Actual chrome tools hanging
        draw.rectangle([tx + 2, height * 0.14, tx + 10, height * 0.14 + h_len - 4], fill=(180, 195, 210))
        draw.ellipse([tx - 2, height * 0.13 + 2, tx + 14, height * 0.17 - 2], fill=(180, 195, 210))

    # Overhead warm sodium-amber light beams
    glow = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.polygon([(width * 0.45, 0), (width * 0.55, 0), (width * 0.85, height), (width * 0.15, height)], fill=(245, 158, 11, 35))
    
    final = Image.alpha_composite(base.convert('RGBA'), glow).convert('RGB')
    final = final.filter(ImageFilter.GaussianBlur(radius=0.6))
    final.save(out_path, 'WEBP', quality=82)
    print(f'Generated {out_path.name} at {width}x{height}')


def make_toolbox_asset(out_path, width=1400, height=960):
    out_path.parent.mkdir(parents=True, exist_ok=True)
    # Pre-shift toolbox talk briefing with workers in PPE at electrical switchgear facility
    # Compose from occupational photo + atmospheric workshop elements
    occ = Image.open(ROOT / 'expertise' / 'occupational.webp')
    occ = occ.resize((width, height), Image.LANCZOS)
    
    # Warm amber overhead crane lighting overlay
    glow = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    
    # Warm overhead lights
    for x in [width * 0.3, width * 0.7]:
        for rad in range(350, 0, -10):
            alpha = int(40 * (1 - rad / 350))
            gdraw.ellipse([x - rad, height * 0.1 - rad, x + rad, height * 0.1 + rad], fill=(245, 158, 11, alpha))
            
    # Dark lower gradient
    for y in range(height):
        alpha = int(220 * max(0, (y - height * 0.5) / (height * 0.5)))
        gdraw.line([(0, y), (width, y)], fill=(8, 13, 19, alpha))
        
    final = Image.alpha_composite(occ.convert('RGBA'), glow).convert('RGB')
    final.save(out_path, 'WEBP', quality=80)
    print(f'Generated {out_path.name} at {width}x{height}')


def make_training_asset(out_path, width=1400, height=960):
    out_path.parent.mkdir(parents=True, exist_ok=True)
    # Classroom training: compose from systems image with classroom warm lighting
    sys_img = Image.open(ROOT / 'expertise' / 'systems.webp')
    sys_img = sys_img.resize((width, height), Image.LANCZOS)
    
    # Warmer educational tone
    enhancer = ImageEnhance.Color(sys_img)
    sys_img = enhancer.enhance(1.1)
    
    glow = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    
    # Presentation projector light cone
    gdraw.polygon([(0, 0), (width * 0.15, 0), (width * 0.9, height * 0.7), (width * 0.4, height * 0.7)], fill=(56, 189, 248, 25))
    
    # Dark lower gradient
    for y in range(height):
        alpha = int(210 * max(0, (y - height * 0.5) / (height * 0.5)))
        gdraw.line([(0, y), (width, y)], fill=(8, 13, 19, alpha))
        
    final = Image.alpha_composite(sys_img.convert('RGBA'), glow).convert('RGB')
    final.save(out_path, 'WEBP', quality=80)
    print(f'Generated {out_path.name} at {width}x{height}')


def main():
    # 1. Fire assets
    make_fire_asset(ROOT / 'expertise' / 'fire.webp')
    make_fire_asset(ROOT / 'activities' / 'fire.webp')
    
    # 2. 5S asset
    make_5s_asset(ROOT / 'activities' / '5s.webp')
    
    # 3. Toolbox talk
    make_toolbox_asset(ROOT / 'activities' / 'toolbox.webp')
    
    # 4. Safety training
    make_training_asset(ROOT / 'activities' / 'training.webp')
    
    # 5. Inspection (from occupational safety)
    occ = Image.open(ROOT / 'expertise' / 'occupational.webp')
    occ.save(ROOT / 'activities' / 'inspection.webp', 'WEBP', quality=82)
    print('Generated activities/inspection.webp')
    
    # 6. Documentation (from systems)
    doc = Image.open(ROOT / 'expertise' / 'systems.webp')
    doc.save(ROOT / 'activities' / 'documentation.webp', 'WEBP', quality=82)
    print('Generated activities/documentation.webp')
    
    # 7. Environment (from expertise environment)
    env = Image.open(ROOT / 'expertise' / 'environment.webp')
    env.save(ROOT / 'activities' / 'environment.webp', 'WEBP', quality=82)
    print('Generated activities/environment.webp')

if __name__ == '__main__':
    main()
