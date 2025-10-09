import os
from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get the absolute path to the index.html file
        file_path = os.path.abspath('dist/index.html')

        # Go to the local file
        page.goto(f'file://{file_path}')

        # Wait for the page to load by checking for the header
        expect(page.get_by_text("Rigel Premium Homes")).to_be_visible()

        # Take a screenshot of the entire page
        page.screenshot(path="jules-scratch/verification/homepage.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    run_verification()