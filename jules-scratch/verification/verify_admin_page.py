import os
from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get the absolute path to the index.html file
        file_path = os.path.abspath('dist/index.html')

        # Go to the local file (homepage) and then navigate to the admin page
        page.goto(f'file://{file_path}')
        page.goto(f'file://{file_path}#/admin')

        # Wait for the admin page to load by checking for the title
        expect(page.get_by_role("heading", name="Admin Panel")).to_be_visible()

        # Take a screenshot of the admin page
        page.screenshot(path="jules-scratch/verification/admin-page.png", full_page=True)

        browser.close()
        print("Verification script completed successfully.")

if __name__ == "__main__":
    run_verification()