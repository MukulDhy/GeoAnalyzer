from PIL import Image, ImageDraw, ImageFont

# Load the user's image
image_path = './flat-design-advertising-agency-sale-banner_23-2150749974.avif'
image = Image.open(image_path)

# Create draw object
draw = ImageDraw.Draw(image)

# Define the text to add
company_name = "Rakheja Enterprises LLP"
government_recognition = "Recognized by Government of India"

# Define positions, font size, and colors (assuming standard fonts as a fallback)
font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"  # Standard font path
font_size_name = 100  # Adjust size according to image dimensions
font_size_recognition = 60

# Load the fonts
font_name = ImageFont.truetype(font_path, font_size_name)
font_recognition = ImageFont.truetype(font_path, font_size_recognition)

# Get the size of the image
image_width, image_height = image.size

# Calculate text position for company name (centered)
text_width_name, text_height_name = draw.textsize(company_name, font=font_name)
position_name = ((image_width - text_width_name) // 2, image_height // 4)

# Calculate text position for government recognition (centered under the company name)
text_width_recognition, text_height_recognition = draw.textsize(government_recognition, font=font_recognition)
position_recognition = ((image_width - text_width_recognition) // 2, position_name[1] + text_height_name + 50)

# Add the company name and recognition to the image
draw.text(position_name, company_name, font=font_name, fill="black")
draw.text(position_recognition, government_recognition, font=font_recognition, fill="black")

# Save the modified image
output_image_path = '/mnt/data/modified_image_rakheja_enterprises.png'
image.save(output_image_path)

output_image_path
