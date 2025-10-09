import os
from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get the absolute path to the index.html file
        file_path = os.path.abspath('dist/index.html')

        # Go to the local file (homepage)
        page.goto(f'file://{file_path}')

        # Wait for the homepage to load and find the second project card
        second_card_link = page.locator('.project-card-link').nth(1)
        expect(second_card_link).to_be_visible()

        # Click the second project card to navigate
        second_card_link.click()

        # Wait for the project detail page to load and check for the correct title
        expected_title = "Two Bedroom Apartment in Kallithea"
        expect(page.get_by_role("heading", name=expected_title)).to_be_visible()

        # Take a screenshot of the project detail page
        page.screenshot(path="jules-scratch/verification/dynamic-project-detail-page.png", full_page=True)

        browser.close()
        print("Verification script completed successfully.")

if __name__ == "__main__":
    run_verification()